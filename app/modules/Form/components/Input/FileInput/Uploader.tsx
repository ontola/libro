import { DirectUpload } from '@rails/activestorage';

type HandleProgress = (progressEvent: ProgressEvent) => void;
type HandleFinish = (signedId: string) => void;
type HandleError = (error: Error) => void;

class Uploader {
  private directUploadUrl: string;
  private handleProgress: HandleProgress;
  private handleFinish: HandleFinish;
  private handleError: HandleError;

  constructor(directUploadUrl: string, handleProgress: HandleProgress, handleFinish: HandleFinish, handleError: HandleError) {
    this.directUploadUrl = directUploadUrl;
    this.handleProgress = handleProgress;
    this.handleFinish = handleFinish;
    this.handleError = handleError;
  }

  upload(file: File): void {
    const upload = new DirectUpload(file, this.directUploadUrl, this);

    upload.create((error, blob) => {
      if (error) {
        this.handleError(error);
      } else {
        this.handleFinish(blob.signed_id);
      }
    });
  }

  directUploadWillStoreFileWithXHR(request: XMLHttpRequest): void {
    request.upload.addEventListener('progress', this.handleProgress);
  }
}

export default Uploader;
