import classNames from 'classnames';
import cls from './NavBar.module.scss';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher/ThemeSwitcher';
import { Link } from 'react-router-dom';
import pokeapiLogo from '@/shared/assets/pokeapi.png';
import { Input } from '@/shared/ui/Input/Input';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { searchPokemonByNameApi } from '@/shared/api/searchPokemonByName/searchPokemonByNameApi';
import { normalizeName } from '@/shared/lib/normalizeName';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export const NavBar = () => {
  const [inputValue, setInputValue] = useState(''); // для поля ввода
  const [search, setSearch] = useState(''); // для запроса

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 400),
    [],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  const { data: names } = searchPokemonByNameApi.useFetchPokemonNamesQuery(
    { partName: search.toLowerCase().replace(/\s+/g, '-'), limit: 5 },
    { skip: search.length === 0 },
  );

  return (
    <div className={classNames(cls.navBar)}>
      <Link to="/" className={cls.logo}>
        <img src={pokeapiLogo} alt="PokeAPI logo" />
      </Link>

      <div className={cls.searchWrapper}>
        <Input
          value={inputValue}
          className={cls.inputName}
          onChange={onInputChange}
          placeholder="Enter the name"
        />

        {names && names.length > 0 && search && (
          <div className={cls.dropdown}>
            {names.map((name) => (
              <AppLink
                onClick={() => {
                  setInputValue('');
                  setSearch('');
                }}
                className={cls.dropdownLink}
                to={`/pokemon/${name}`}
                key={name}
              >
                {normalizeName(name)}
              </AppLink>
            ))}
          </div>
        )}
      </div>

      <ThemeSwitcher />
    </div>
  );
};
