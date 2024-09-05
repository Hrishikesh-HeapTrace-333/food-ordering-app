<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Negotiation\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends AbstractController
{
    private $em;
    private $userRepository;

    public function __construct(EntityManagerInterface $em, UserRepository $userRepository)
    {
        $this->em = $em;
        $this->userRepository = $userRepository;
    }

    // #[Route('/user', name: 'add_user', methods: 'GET')]
    // public function getUser(): Response
    // {
    // }


    #[Route('/api/user', name: 'add_user', methods: ['POST'])]
    public function addUser(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['firstName'], $data['lastName'], $data['email'], $data['phone'], $data['password'])) {
            $user = new User();
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            $user->setEmail($data['email']);
            $user->setPhone($data['phone']);
            $user->setPassword($data['password']);

            try {
                $this->em->persist($user);
                $this->em->flush();
                return $this->json(['message' => 'User added successfully', 'success' => true], 201);
            } catch (\Exception $e) {
                return $this->json(['message' => 'User could not be added', 'success' => false], 400);
            }
        } else {
            return $this->json(['message' => 'Invalid data', 'success' => false], 400);
        }
    }
    // src/Controller/UserController.php

    #[Route('/api/authenticate', name: 'authenticate_user', methods: 'POST')]
    public function authenticateUser(Request $request, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $user = $userRepository->findOneBy(['email' => $email]);
        // printf($user->username, $user->password);
        if ($user) {
            if ($password === $user->getPassword()) {
                return $this->json(['success' => true, 'user' => $user], 200);
            } else {
                return $this->json(['success' => false, 'user' => $user, 'message' => 'Invalid credentials'], 401);
            }
        } else {
            return $this->json(['success' => false, 'message' => 'User not found'], 404);
        }
    }
}
