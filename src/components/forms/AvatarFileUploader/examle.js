import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { computed } from "mobx";
import { withRouter, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import objectToFormData from "object-to-formdata";
import _omit from "lodash/omit";

import Loader from "Pages/RoomTypes/components/Loader";
import DeleteIcon from "react-icons/lib/md/delete";

@withRouter
@inject("store")
@observer
class Actions extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    roomTypeStore: PropTypes.object.isRequired,
    store: PropTypes.object,
    history: PropTypes.object
  }

  @computed get isValid() {
    const { form } = this.props;

    if (form.changed && !form.validating) {
      return form.isValid;
    }

    if (form.touched && !form.validating) {
      return form.isValid;
    }

    return form.focused || form.isValid;
  }


  @computed get isLoading() {
    const { roomTypeStore } = this.props;
    return roomTypeStore.isPending;
  }

  handleClick = (e) => {
    e.preventDefault();

    this.props.form.onSubmit(e, {
      onSuccess: this.successSubmitHandler
    });
  }

  successSubmitHandler = (form) => {
    const { roomTypeStore } = this.props;

    let data = form.values();
    data = _omit(data, 'avatar');
    data = objectToFormData({ data });

    const file = form.$('avatar').files && form.$('avatar').files[0];
    
    if (file) {
      data.append('data[avatar][image]', file);
    }

    roomTypeStore.create(data)
      .then(store => this.navigateTo(`/room_types/${store.room_type.id}`))
      .catch(error => this.errorSubmitHandler(error));
  }

  errorSubmitHandler(error) {
    const { store } = this.props;
    const { data } = error.response;

    store.notifyStore.create({
      header: 'Произошла ошибка!',
      type: 'error',
      messages: data.messages,
    });
  }

  handleDestroyClick = () => {

  }
  
  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    return (
      <div className="groups__item">
        <div className="groups__item-content">
          <div className="segment">
            {!this.isValid &&
              <p className="text error">
                <FormattedMessage id='shared.check_for_errors' />
              </p>}

            {this.isLoading && <Loader />}

            <div className="group">
              <div className="float-left">
                <div className="buttons">
                  <button
                    onClick={this.handleClick}
                    className="green button"
                  ><FormattedMessage id='shared.confirm' />
                  </button>
                  <Link
                    to="/room_types"
                    className="gray button"
                  ><FormattedMessage id='shared.cancel' />
                  </Link>
                </div>
              </div>
              <div className="float-right">
                <button
                  className="button gray"
                  onClick={this.handleDestroyClick}
                >
                  <i className="icon">
                    <DeleteIcon />
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Actions;