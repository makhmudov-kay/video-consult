import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'az-svg-smiles',
  templateUrl: './svg-smiles.component.svg',
  styleUrls: ['./svg-smiles.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgSmilesComponent {}
