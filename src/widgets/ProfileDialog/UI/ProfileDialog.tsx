import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'features/Dialog';
import { Form } from 'features/Form';
import cls from './ProfileDialog.module.scss';
import { DatePicker } from 'shared/UI/DatePicker/DatePicker';
import { Input } from 'shared/UI/Input/Input';
import { Dropdown } from 'shared/UI/Dropdown/Dropdown';
import { countriesApi } from 'shared/config/api/countriesApi';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { unauth } from 'shared/config/store/actionCreators/authActions';
import { Profile } from 'shared/config/store/types/profileSlice.types';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { CurrentTrip } from 'widgets/CurrentTrip';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { useLocation } from 'react-router-dom';
import { getCurrentTrip } from 'shared/config/store/actionCreators/tripActions';
import { currentProfileSelector } from 'shared/config/store/selectors/profileSelectors';
import { updateCurrentProfile } from 'shared/config/store/actionCreators/profileActions';

interface ProfileDialogProps {
    isOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLElement;
}

export const ProfileDialog = ({ isOpen, onClose, anchorEl }: ProfileDialogProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);

  const profile = useAppSelector(currentProfileSelector);

  const [formData, setFormData] = useState<Profile>(profile);
  const [hasChanges, setHasChanges] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  
  const [isShownCurrentTrip, setIsShownCurrentTrip] = useState(true);

  useEffect(() => {
    const isCurrentNotShowablePage = location.pathname.includes(
      RoutePath[AppRoutes.CURRENT]
    ) || location.pathname === '/';
    setIsShownCurrentTrip(!isCurrentNotShowablePage); // Показываем виджет везде, кроме CURRENT
  }, [location.pathname]);

  useEffect(() => {
    if (isShownCurrentTrip) {
        dispatch(getCurrentTrip());
    }
  }, [isShownCurrentTrip]);

  useEffect(() => {
      setFormData(profile);
  }, [profile]);

  useEffect(() => {
    if (JSON.stringify(profile) !== JSON.stringify(formData)) {
      setHasChanges(true);
    }
  }, [formData]);

  useEffect(() => {
      const fetchCountries = async () => {
          setIsLoading(true);
          if (countrySearchQuery) {
              const country = await countriesApi.getCountryByName(countrySearchQuery);
              if (country) {
                  setCountries([country]);
              }
          } else {
              const countriesList = await countriesApi.getCountries();
              setCountries(countriesList);
          }
          setIsLoading(false);
      };

      fetchCountries();
  }, [countrySearchQuery]);

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
      setFormData(prev => ({
          ...prev,
          [field]: value
      }));
      setHasChanges(true);
  };

  const handleScrollCalendarIntoView = () => {
    setTimeout(() => containerRef.current?.scrollTo({
      behavior: "smooth",
      top: 250
    }), 0)
  }

  const handleScrollDropdownIntoView = () => {
    setTimeout(() => containerRef.current?.scrollTo({
      behavior: "smooth",
      top: 200
    }), 0)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateCurrentProfile(formData));
      setHasChanges(false);
  };

  return (
      <Dialog
          scrollableContentRef={containerRef}
          isOpen={isOpen}
          onClose={onClose}
          title="Профиль"
          anchorEl={anchorEl}
          className={cls.profileDialog}
      >
          <Form
              className={cls.form}
              onSubmit={hasChanges ? handleSubmit : undefined}
              submitText={hasChanges ? "Сохранить" : undefined}
          >
            <Input
                label='Имя пользователя'
                placeholder='Имя пользователя'
                className={cls.input}
                value={formData?.name ?? ''}
                onChange={handleInputChange('name')}
            />
            <Input
                prefix='@'
                label='Тэг пользователя'
                placeholder='Тэг пользователя'
                className={cls.input}
                value={formData?.tagName ?? ''}
                onChange={handleInputChange('tagName')}
            />
            <Input
                label='Email'
                placeholder='Email'
                className={cls.input}
                value={formData?.email ?? ''}
                onChange={handleInputChange('email')}
            />
            <Dropdown 
                className={cls.input}
                value={formData?.country ?? null}
                options={countries}
                placeholder="Выберите страну"
                searchable
                onDropdownOpen={handleScrollDropdownIntoView}
                searchAction={setCountrySearchQuery}
                onChange={handleInputChange('country')}
                loading={isLoading}
            />
            <DatePicker
                onCalendarOpen={handleScrollCalendarIntoView}
                placeholder='Дата рождения'
                className={cls.input}
                value={formData?.birthDate ?? ''}
                onChange={handleInputChange('birthDate')}
            />  
          </Form>
          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={() => {
              dispatch(unauth());
            }}
          >
            Выйти
          </Button>
          {isShownCurrentTrip && (
            <CurrentTrip
                isTitleShown
                isEditable={false}
                isShownRedirectButton={true}
                onRedirectButtonClick={onClose}
            />
          )}
      </Dialog>
  );
};
