<?php

namespace App\Entity;

use App\Repository\FoodRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FoodRepository::class)]
class Food
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: "float")]
    private ?float $price = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: "boolean")]
    private ?bool $favourite = null;

    #[ORM\Column(type: "integer")]
    private ?int $star = null;

    #[ORM\Column(type: "simple_array", nullable: true)]
    private ?array $tags = null;

    #[ORM\Column(length: 255)]
    private ?string $imageUrl = null;

    #[ORM\Column(length: 255)]
    private ?string $cookTime = null;

    #[ORM\Column(length: 255)]
    private ?string $origins = null;

    #[ORM\Column(type: "simple_array", nullable: true)]
    private ?array $facts = null;

    #[ORM\Column(type: "integer")]
    private ?int $calories = null;

    #[ORM\OneToOne(targetEntity: Nutrition::class, cascade: ["persist", "remove"])]
    private ?Nutrition $nutrition = null;

    // Getters and Setters for all properties
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function isFavourite(): ?bool
    {
        return $this->favourite;
    }

    public function setFavourite(bool $favourite): self
    {
        $this->favourite = $favourite;

        return $this;
    }

    public function getStar(): ?int
    {
        return $this->star;
    }

    public function setStar(int $star): self
    {
        $this->star = $star;

        return $this;
    }

    public function getTags(): ?array
    {
        return $this->tags;
    }

    public function setTags(?array $tags): self
    {
        $this->tags = $tags;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getCookTime(): ?string
    {
        return $this->cookTime;
    }

    public function setCookTime(string $cookTime): self
    {
        $this->cookTime = $cookTime;

        return $this;
    }

    public function getOrigins(): ?string
    {
        return $this->origins;
    }

    public function setOrigins(string $origins): self
    {
        $this->origins = $origins;

        return $this;
    }

    public function getFacts(): ?array
    {
        return $this->facts;
    }

    public function setFacts(?array $facts): self
    {
        $this->facts = $facts;

        return $this;
    }

    public function getCalories(): ?int
    {
        return $this->calories;
    }

    public function setCalories(int $calories): self
    {
        $this->calories = $calories;

        return $this;
    }

    public function getNutrition(): ?Nutrition
    {
        return $this->nutrition;
    }

    public function setNutrition(?Nutrition $nutrition): self
    {
        $this->nutrition = $nutrition;

        return $this;
    }
}
