<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\FoodRepository;

class FoodController extends AbstractController
{
    private $em;
    private $foodRepository;

    public function __construct(EntityManagerInterface $em, FoodRepository $foodRepository)
    {
        $this->em = $em;
        $this->foodRepository = $foodRepository;
    }
    // #[Route('/food', name: 'app_food')]
    // public function index(): Response
    // {
    //     return $this->render('food/index.html.twig', [
    //         'controller_name' => 'FoodController',
    //     ]);
    // }

    #[Route('/api/foods', name: 'app_foods', methods: 'GET')]
    public function getFoods(): JsonResponse
    {
        $foods = $this->foodRepository->findAll();
        return $this->json($foods);
    }

    #[Route('/api/foods/{id}', name: 'app_food', methods: 'GET')]
    public function getFood($id): JsonResponse
    {
        $food = $this->foodRepository->find($id);
        if (!$food) {
            return $this->json(['error' => 'Food not found'], 404);
        }
        return $this->json($food);
    }
}
