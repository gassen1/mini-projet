import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Promotion } from '../../models/promotion.model';
import { PromotionService } from '../../services/promotion.service';

@Component({
    selector: 'app-promotion-management',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './promotion-management.component.html',
    styles: [`
    .container { padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    button { padding: 10px 15px; margin-right: 10px; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background-color: #f2f2f2; }
  `]
})
export class PromotionManagementComponent implements OnInit {
    promotions: Promotion[] = [];
    newPromotion: Promotion = {
        code: '',
        pourcentageReduction: 0.1,
        dateDebut: '',
        dateFin: '',
        actif: true
    };

    constructor(private promotionService: PromotionService) { }

    ngOnInit(): void {
        this.loadPromotions();
    }

    loadPromotions() {
        this.promotionService.getAll().subscribe(data => this.promotions = data);
    }

    createPromotion() {
        this.promotionService.create(this.newPromotion).subscribe(created => {
            this.promotions.push(created);
            this.newPromotion = { code: '', pourcentageReduction: 0.1, dateDebut: '', dateFin: '', actif: true };
        });
    }

    deletePromotion(id: number) {
        if (confirm('Are you sure you want to delete this promotion?')) {
            this.promotionService.delete(id).subscribe(() => {
                this.promotions = this.promotions.filter(p => p.id !== id);
            });
        }
    }
}
