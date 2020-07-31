import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { darken, lighten } from 'polished';
import { computed, reaction } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { withTranslation } from 'react-i18next';

// import { Divider } from 'components/ui';
// import { Triangle } from 'icons';
import FilterState from './state/FilterState';
import { SelectedFilters } from './SelectedFilters';
import { FiltersControls } from './FiltersControls';

// const ControlBtn = styled.div`
//   padding: 10px !important;
//   background-color: transparent !important;
//   border: none !important;
//   cursor: pointer;
//
//   &.primary {
//     color: #1a7ce8 !important;
//
//     &:hover {
//       color: ${lighten(0.1, '#1a7ce8')} !important;
//     }
//   }
//
//   &.secondary {
//     color: #a1abb8 !important;
//
//     &:hover {
//       color: ${darken(0.1, '#a1abb8')} !important;
//     }
//   }
// `;

// const Dropdown = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 13px 0 13px 13px;
//   cursor: pointer;
//
//   & svg {
//     width: 15px;
//     height: 7px;
//     fill: #4f5660;
//   }
// `;

const FiltersText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #a1abb8;
  text-transform: uppercase;
  margin-right: 18px;
`;

// const Controls = styled.div`
//   display: flex;
//   align-items: center;
// `;

const Filters = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 22px;
  height: 68px;
  background-color: #ffffff;
  border: 1px solid #E7EAED;
  border-radius: 4px;
  margin-bottom: 21px;
`;

@withTranslation()
@observer
class FiltersPanel extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    t: PropTypes.func
  }

  static defaultProps = {
    items: [],
    onChange: () => {}
  }

  constructor(props) {
    super(props);

    const hooks = {
      onSuccess: this.handleSuccess
    };

    this.filterState = new FilterState(hooks);
  }

  componentDidMount() {
    this._searchStateChange = reaction(
      () => this.filterState.$('filters').value,
      (value) => (this.props.onChange(value))
    );
  }

  componentWillUnmount() {
    this._searchStateChange();
  }

  @computed get filters() {
    return Array.from(this.filterState.$('filters').fields.values());
  }

  handleSuccess = () => {

  }

  render() {
    const { items, t } = this.props;

    return (
      <Provider
        filterState={this.filterState}
      >
        <Wrapper>
          <Filters>
            <FiltersText>
              {t('FiltersPanel.Title')}
            </FiltersText>
            <SelectedFilters />
            <FiltersControls items={items} />
          </Filters>
          {/*<Controls>*/}
          {/*  <ControlBtn*/}
          {/*    className='primary'*/}
          {/*    variant='flat'*/}
          {/*  >*/}
          {/*    {t('FiltersPanel.Save.ButtonTitle')}*/}
          {/*  </ControlBtn>*/}
          {/*  <ControlBtn*/}
          {/*    className='secondary'*/}
          {/*    variant='flat'*/}
          {/*  >*/}
          {/*    {t('FiltersPanel.Cancel.ButtonTitle')}*/}
          {/*  </ControlBtn>*/}
          {/*  <Divider width='1px' height='32px' color='#e7eaed' />*/}
          {/*  <Dropdown>*/}
          {/*    <Triangle />*/}
          {/*  </Dropdown>*/}
          {/*</Controls>*/}
        </Wrapper>
      </Provider>
    );
  }
}

export default styled(FiltersPanel)``;
