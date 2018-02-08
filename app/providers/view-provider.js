import express from 'express';
import BaseProvider from 'tojem/providers/base-provider';

class ViewProvider extends BaseProvider {
  handle() {
    this.setupEngine();
    this.setupStaticView();
  }

  setupEngine() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', this.config.get('dir.view'));
  }

  setupStaticView() {
    this.app.use(express.static(this.config.get('dir.public')));
  }
}

export default ViewProvider;
