import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conference } from '../model/conference.model';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sl-conference-info-drawer',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatRippleModule, ReactiveFormsModule],
  templateUrl: './conference-info-drawer.component.html',
  styleUrls: ['./conference-info-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceInfoDrawerComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  @Input() conference?: Conference;
  @Output() closed = new EventEmitter<void>();

  form?: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: this.conference?.title,
      description: this.conference?.description,
    });
  }
}
