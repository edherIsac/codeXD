import { Component, ViewChild } from '@angular/core';
import { EditorCodexdComponent } from './modulos/editor-codexd/editor-codexd.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(EditorCodexdComponent, {static: false}) editor: EditorCodexdComponent;

  title = 'ng';

  compilarClk() {
    this.editor.analizar();
  }
}
