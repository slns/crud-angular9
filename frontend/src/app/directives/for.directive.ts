import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit{
  
  @Input('myForEm') numbers: number[];
  @Input('myForUsando') text: string;

  constructor(
    private container: ViewContainerRef, 
    private template: TemplateRef<any>
    ) { 

  }

  ngOnInit(): void {
    for (const number of this.numbers) {
      this.container.createEmbeddedView(
        this.template, { $implicit: number});
    }
    console.log(this.numbers);
    console.log(this.text);
  }

}
