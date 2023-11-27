import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgDestroy } from 'ngx-az-core';
import { CategorySelectResponse } from 'projects/agro-consult/src/app/shared/models/category-select.response';
import { SkillsByCategoryIdResponse } from 'projects/agro-consult/src/app/shared/models/skills-by-category.response';
import { CategorySelectorService } from 'projects/agro-consult/src/app/shared/services/select-category.service';
import { SkillsService } from 'projects/agro-consult/src/app/shared/services/skills.service';
import { takeUntil } from 'rxjs';
import { SelectedValue } from '../../dto/selected-values.interface';

@Component({
  selector: 'az-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.less'],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecializationComponent implements OnInit {
  /**
   *
   */
  @Input()
  form!: FormGroup;

  /**
   *
   */
  @Output()
  selectedValues = new EventEmitter<SelectedValue>();

  /**
   *
   */
  category!: CategorySelectResponse[];

  /**
   *
   */
  skills!: SkillsByCategoryIdResponse[];

  /**
   *
   */
  selectedCategory?: CategorySelectResponse;

  /**
   *
   */
  selectedSkills?: SkillsByCategoryIdResponse[];

  /**
   *
   * @param $selectCategory
   * @param $skills
   * @param $destroy
   * @param cd
   */
  constructor(
    private $selectCategory: CategorySelectorService,
    private $skills: SkillsService,
    private $destroy: NgDestroy,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.loadCategory().subscribe((result) => {
      this.category = result.data;
      const category = this.form.controls['category_id'].value;
      if (category) {
        this.chooseCategory(category, true);
      }
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  loadCategory() {
    return this.$selectCategory.get().pipe(takeUntil(this.$destroy));
  }

  /**
   *
   * @param categoryId
   */
  loadSkills(categoryId: number) {
    return this.$skills.getAllByCategoryId(categoryId);
  }

  /**
   *
   * @param categoryId
   * @param init
   */
  chooseCategory(categoryId: number, init = false) {
    if (!init) {
      this.form.controls['skill_ids'].reset();
    }
    this.selectedCategory = this.category.find((c) => c.id === categoryId);

    // Добавил пока отключен скилс если добавим скилс то нужно удалиь этот кусок кода, код который возвращает выбранную категорию для view resume

    if (this.selectedCategory) {
      const selectedCategoryAndSkills: SelectedValue = {
        category: this.selectedCategory,
        skills: this.selectedSkills,
      };
      this.selectedValues.emit(selectedCategoryAndSkills);
    }

    this.loadSkills(categoryId)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.skills = result.data;
        const skillsIds = this.form.controls['skill_ids'].value;
        if (skillsIds) {
          this.chooseSkills(skillsIds);
        }
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param skillIds
   */
  chooseSkills(skillIds?: number[] | null) {
    if (skillIds) {
      this.selectedSkills = this.skills.filter((s) => skillIds.includes(s.id));
      if (this.selectedCategory) {
        const selectedCategoryAndSkills: SelectedValue = {
          category: this.selectedCategory,
          skills: this.selectedSkills,
        };
        this.selectedValues.emit(selectedCategoryAndSkills);
      }
    }
  }
}
