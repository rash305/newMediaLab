import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUploader, FileLikeObject, FileItem} from 'ng2-file-upload';

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  @Output() videoFileEmitter = new EventEmitter<FileItem>();

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: false,
    method: 'post',
    itemAlias: 'attachment'

  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.videoFileEmitter.emit(file);
  };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }

}
