import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';

@Component({
  selector: 'ac-article-type-standard',
  templateUrl: './views/article-list-element.type-standard.component',
})
export class ArticleListElementTypeStandardComponent {

  constructor() {
  }
}

@Component({
  selector: 'ac-article-type-large',
  templateUrl: './views/article-list-element.type-large.component'
})
export class ArticleListElementTypeLargeComponent {

  constructor() {
  }
}

@Component({
  selector: 'ac-article',
  template: '<ng-template #componentContainer></ng-template>',
  entryComponents: [ArticleListElementTypeStandardComponent, ArticleListElementTypeLargeComponent],
})
export class ArticleListElementComponent implements OnInit, OnDestroy {

  @ViewChild('componentContainer', {read: ViewContainerRef}) componentContainer: ViewContainerRef;
  @Input() articleView;
  @Input() article;
  private types = {
    'standard': ArticleListElementTypeStandardComponent,
    'large': ArticleListElementTypeLargeComponent
  };
  private childComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.types[this.articleView]);
    this.childComponent = this.componentContainer.createComponent(factory);
    this.childComponent.instance.article = this.article;
  }

  ngOnDestroy() {
    if (this.childComponent) {
      this.childComponent.destroy();
      this.childComponent = null;
    }
  }

}

