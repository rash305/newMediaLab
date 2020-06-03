import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUploader, FileLikeObject, FileItem} from 'ng2-file-upload';


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  @Output() videoFileEmitter = new EventEmitter<FileItem>();

  public uploader: FileUploader = new FileUploader({});

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.videoFileEmitter.emit(file);
    };
  }

}
