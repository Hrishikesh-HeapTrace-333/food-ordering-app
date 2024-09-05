import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';
import { CartServiceService } from '../service/cart/cart-service.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  @Output() closeOrder = new EventEmitter<void>();

  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.showConfetti();

    setTimeout(() => {
      this.closeOrder.emit();
    }, 5000); // Show the modal for 5 seconds
  }

  showConfetti() {
    console.log("showConfetti :: called")
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 1000 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    this.goToHome();
  }

  goToHome(): void {
    this.closeOrder.emit();
  }

  goHome(): void {
    this.router.navigateByUrl('/home'); // Replace '/' with your home route if different
  }
}
