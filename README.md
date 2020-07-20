# Angular 9 PrimeNg Websocket Chat Client

A simple websocket public chat client with a command query separation.

Main features:
- classic interface
- suitable for small screen sizes
- messages may contain file attachments
- displays backend generated thumbnails of the following file attachment types: bmp, jpeg, png, gif, tiff, pdf, any video files supported by ffmpeg
- plays backend transcoded streams of video file attachments (a transcoder service must be enabled on the backend)
- animated user typing indication
- so far only public chat has been implemented
- both backend and frontend apps can handle more than 1000 online users

A SpringBoot service for this project: [Pure Reactive SpringBoot WebFlux MongoDB WebSocket Chat](https://github.com/alexshavlovsky/spring-mongo-reactive-chat).

## Technology Stack
Component            | Technology
---                  | ---
JS framework         | Angular 9
UI components        | Prime Ng 9
Chat protocol        | WebSockets
Video streaming      | [A simple HTML5, YouTube and Vimeo player](https://github.com/sampotts/plyr)

## Screenshots

<p align="center">
  <img src="screenshots/3_main_chat_h.png?raw=true" width="720"/>
</p>

<p align="center">
  <img src="screenshots/1_welcome_screen.png?raw=true" width="360"/>
  <img src="screenshots/2_main_chat_v.png?raw=true" width="360"/> 
</p>

<p align="center">
  <img src="screenshots/4_file_attachments_uploading.png?raw=true" width="720"/>
</p>

<p align="center">
  <img src="screenshots/5_file_attachments_menu.png?raw=true" width="720"/>
</p>

<p align="center">
  <img src="screenshots/6_attachments_h.png?raw=true" width="720"/>
</p>

<p align="center">
  <img src="screenshots/7_attachments_v.png?raw=true" width="360"/>
</p>
