import cls from './AbilitiesViewer.module.scss';
import { useState } from 'react';
import { normalizeName } from '@/shared/lib/normalizeName';
import Arrow from '@/shared/assets/Arrow.svg';
import { Button } from '@/shared/ui/Button/Button';

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  description?: string;
}

interface AbilitiesViewerProps {
  abilities: Ability[];
}

export const AbilitiesViewer = (props: AbilitiesViewerProps) => {
  const { abilities } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < abilities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(abilities.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentAbility = abilities[currentIndex];

  return (
    <div className={cls.abilitiesViewer}>
      <h2>Abilities</h2>
      <div className={cls.abilityContent}>
        <p className={cls.abilityName}>
          {normalizeName(currentAbility.ability.name)}
        </p>
        <p className={cls.abilityDescription}>
          {currentAbility.description
            ? currentAbility.description
            : 'Description is missing'}
        </p>
      </div>

      <div className={cls.navigation}>
        <Button className={cls.navButton} onClick={handlePrev}>
          <Arrow className={cls.prev} />
        </Button>

        <span className={cls.counter}>
          {currentIndex + 1} / {abilities.length}
        </span>

        <Button className={cls.navButton} onClick={handleNext}>
          <Arrow className={cls.next} />
        </Button>
      </div>
    </div>
  );
};
