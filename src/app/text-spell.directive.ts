import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextSpell]',
})
export class TextSpellDirective implements OnInit {
  @Input() appTextSpell: string;

  constructor() {}

  ngOnInit() {
    console.log(this.appTextSpell);
  }
}
