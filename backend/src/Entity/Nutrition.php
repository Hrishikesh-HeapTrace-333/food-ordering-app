<?php

namespace App\Entity;

use App\Repository\NutritionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NutritionRepository::class)]
class Nutrition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fat = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $carbohydrates = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $protein = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sodium = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fiber = null;

    // Getters and Setters for all properties
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFat(): ?string
    {
        return $this->fat;
    }

    public function setFat(?string $fat): self
    {
        $this->fat = $fat;

        return $this;
    }

    public function getCarbohydrates(): ?string
    {
        return $this->carbohydrates;
    }

    public function setCarbohydrates(?string $carbohydrates): self
    {
        $this->carbohydrates = $carbohydrates;

        return $this;
    }

    public function getProtein(): ?string
    {
        return $this->protein;
    }

    public function setProtein(?string $protein): self
    {
        $this->protein = $protein;

        return $this;
    }

    public function getSodium(): ?string
    {
        return $this->sodium;
    }

    public function setSodium(?string $sodium): self
    {
        $this->sodium = $sodium;

        return $this;
    }

    public function getFiber(): ?string
    {
        return $this->fiber;
    }

    public function setFiber(?string $fiber): self
    {
        $this->fiber = $fiber;

        return $this;
    }
}
