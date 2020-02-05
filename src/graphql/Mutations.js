import gql from 'graphql-tag'

const uploadPhotoMutation = gql `mutation uploadPhoto($data: User!) {
    uploadPhoto(data: $data) {
      token
    }
  }`;

export {uploadPhotoMutation};