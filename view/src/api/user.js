import {fetchUpload} from "../server/network";

export const uploadImgs = (img) => fetchUpload(
  '/user/headimg',
  img
)
