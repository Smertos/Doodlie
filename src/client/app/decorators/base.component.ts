import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var Reflect: any;
const _reflect: any = Reflect;

export function BaseComponent(metadata: any = {}) {
  return function(cls: any) {
    let anns = _reflect.getMetadata('annotations', cls) || [];
    anns.push(new Component(getMetadata(metadata)));
    _reflect.defineMetadata('annotations', anns, cls);
    return cls;
  }
}

function getMetadata(metadata: any = {}) {
  let DIRECTIVES: Array<any> = [];

  metadata.directives = metadata.directives ? metadata.directives.concat(DIRECTIVES) : DIRECTIVES;

  if (metadata.changeDetection)
      metadata.changeDetection = metadata.changeDetection;
  else
      metadata.changeDetection = ChangeDetectionStrategy.OnPush;


  if (metadata.encapsulation)
      metadata.encapsulation = metadata.encapsulation;

  if (metadata.init)
      metadata.init();

  return metadata;
}