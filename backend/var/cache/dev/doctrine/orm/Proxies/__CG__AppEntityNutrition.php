<?php

namespace Proxies\__CG__\App\Entity;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class Nutrition extends \App\Entity\Nutrition implements \Doctrine\ORM\Proxy\InternalProxy
{
    use \Symfony\Component\VarExporter\LazyGhostTrait {
        initializeLazyObject as private;
        setLazyObjectAsInitialized as public __setInitialized;
        isLazyObjectInitialized as private;
        createLazyGhost as private;
        resetLazyObject as private;
    }

    public function __load(): void
    {
        $this->initializeLazyObject();
    }
    

    private const LAZY_OBJECT_PROPERTY_SCOPES = [
        "\0".parent::class."\0".'carbohydrates' => [parent::class, 'carbohydrates', null],
        "\0".parent::class."\0".'fat' => [parent::class, 'fat', null],
        "\0".parent::class."\0".'fiber' => [parent::class, 'fiber', null],
        "\0".parent::class."\0".'id' => [parent::class, 'id', null],
        "\0".parent::class."\0".'protein' => [parent::class, 'protein', null],
        "\0".parent::class."\0".'sodium' => [parent::class, 'sodium', null],
        'carbohydrates' => [parent::class, 'carbohydrates', null],
        'fat' => [parent::class, 'fat', null],
        'fiber' => [parent::class, 'fiber', null],
        'id' => [parent::class, 'id', null],
        'protein' => [parent::class, 'protein', null],
        'sodium' => [parent::class, 'sodium', null],
    ];

    public function __isInitialized(): bool
    {
        return isset($this->lazyObjectState) && $this->isLazyObjectInitialized();
    }

    public function __serialize(): array
    {
        $properties = (array) $this;
        unset($properties["\0" . self::class . "\0lazyObjectState"]);

        return $properties;
    }
}