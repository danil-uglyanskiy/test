import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { darken, lighten } from 'polished';

import { Button } from 'components/forms';
import { Avatar } from 'components/ui';

const UploadPhotoButton = styled(Button)`
  flex: 1 0;
  border-radius: 4px;
  background-color: transparent !important;
  color: #2D91FF !important;
  border: 1px solid #2D91FF !important;
  padding: 0 17px;
  margin-left: 20px;
  outline: none;
  box-shadow: none;
  white-space: nowrap;

  &:hover {
    color: ${darken(0.1, '#2D91FF')} !important;
    border: 1px solid ${darken(0.1, '#2D91FF')} !important; 
  }
`;

const DeletePhotoButton = styled(Button)`
  flex: 1 0;
  font-size: 13px;
  font-weight: 500;
  color: #747d8a;
  background-color: transparent;
  padding: 0;
  white-space: nowrap;
  padding-left: 20px;

  &:hover {
    color: ${lighten(0.1, '#747d8a')}
  }

  &:active {
    background-color: transparent;
  }
`;

const DropContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled(Dropzone)``;

@observer
class AvatarFileUploader extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    multiple: PropTypes.bool,
    field: PropTypes.object,
    accepted: PropTypes.string,
    size: PropTypes.number,
    url: PropTypes.string.isRequired
  }

  static defaultProps = {
    className: '',
    multiple: false,
    size: 64,
    accepted: ''
  }

  @computed get avatarUrl() {
    const { field } = this.props;
    return field.files || field.$('image_urls.thumb').value ? true : false;
  }

  handleDrop = (acceptedFiles, rejectedFiles, e) => {
    const { field } = this.props;

    if (acceptedFiles.length > 0) {
      field.onDrop(e);
    } 
  }

  handleRemoveClick = () => {
    const { field } = this.props;
    field.clear();
  }

  render() {
    const { field, accepted, multiple } = this.props;

    return (
      <>
        <Wrapper
          disabled={this.isUploading}
          multiple={multiple}
          accepted={accepted}
          onDrop={this.handleDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <DropContainer {...getRootProps()}>
              <input {...getInputProps()} />

              <Avatar field={field} />

              <UploadPhotoButton>
                {this.avatarUrl ? 'Изменить фото' : 'Загрузить фото'}
              </UploadPhotoButton>
            </DropContainer>
          )}
        </Wrapper>

        {this.avatarUrl && (
          <DeletePhotoButton
            onClick={this.handleRemoveClick}
          >
            Удалить фото
          </DeletePhotoButton>
        )}
      </>
    );
  }
}
export default styled(AvatarFileUploader)``;
