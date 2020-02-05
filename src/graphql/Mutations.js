import gql from 'graphql-tag'

const uploadPhotoMutation = gql `mutation uploadPhoto($photo: Upload!) {
    uploadPhoto(photo: $photo) {
      filename
      path
    }
  }`;

export {uploadPhotoMutation};