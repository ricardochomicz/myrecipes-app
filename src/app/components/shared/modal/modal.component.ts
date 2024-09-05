import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

declare const $: any;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output()
  onHide: EventEmitter<Event> = new EventEmitter<Event>();
  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const jQueryElement = this.getJQueryElement()
    jQueryElement.find('[modal-title]').addClass('modal-title');
    jQueryElement.find('[modal-body]').addClass('modal-body');
    jQueryElement.find('[modal-footer]').addClass('modal-footer');

    jQueryElement.on('hidden.bs.modal', (e: any) => {
      this.onHide.emit(e)
    })
  }

  show() {
    this.getJQueryElement().modal('show')
  }

  hide() {
    this.getJQueryElement().modal('hide')
  }

  private getJQueryElement() {
    const nativeElement = this.element.nativeElement;
    return $(nativeElement.firstChild);
  }
}
