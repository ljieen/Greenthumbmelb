<?php

/**
 * DO NOT EDIT!
 * This file was automatically generated via bin/generate-validator-spec.php.
 */

namespace AmpProject\Validator\Spec\Tag;

use AmpProject\Format;
use AmpProject\Html\Attribute;
use AmpProject\Html\Tag as Element;
use AmpProject\Validator\Spec\AttributeList;
use AmpProject\Validator\Spec\Identifiable;
use AmpProject\Validator\Spec\SpecRule;
use AmpProject\Validator\Spec\Tag;

/**
 * Tag class Select.
 *
 * @package ampproject/amp-toolbox.
 *
 * @property-read string $tagName
 * @property-read array $attrs
 * @property-read array<string> $attrLists
 * @property-read string $specUrl
 * @property-read array<string> $htmlFormat
 */
final class Select extends Tag implements Identifiable
{
    /**
     * ID of the tag.
     *
     * @var string
     */
    const ID = 'SELECT';

    /**
     * Array of spec rules.
     *
     * @var array
     */
    const SPEC = [
        SpecRule::TAG_NAME => Element::SELECT,
        SpecRule::ATTRS => [
            Attribute::AUTOFOCUS => [
                SpecRule::DISABLED_BY => [
                    Attribute::AMP4EMAIL,
                ],
            ],
            Attribute::DISABLED => [],
            Attribute::MULTIPLE => [],
            Attribute::NO_VERIFY => [
                SpecRule::VALUE => [
                    '',
                ],
                SpecRule::DISABLED_BY => [
                    Attribute::AMP4EMAIL,
                ],
            ],
            Attribute::REQUIRED => [],
            Attribute::SIZE => [],
            '[autofocus]' => [
                SpecRule::DISABLED_BY => [
                    Attribute::AMP4EMAIL,
                ],
            ],
            '[disabled]' => [],
            '[multiple]' => [],
            '[required]' => [],
            '[size]' => [],
        ],
        SpecRule::ATTR_LISTS => [
            AttributeList\NameAttr::ID,
        ],
        SpecRule::SPEC_URL => 'https://amp.dev/documentation/components/amp-form/',
        SpecRule::HTML_FORMAT => [
            Format::AMP,
            Format::AMP4ADS,
            Format::AMP4EMAIL,
        ],
    ];
}
