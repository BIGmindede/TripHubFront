import { Dialog } from 'features/Dialog'
import { Form } from 'features/Form';
import { Input } from 'shared/UI/Input/Input';
import { useState } from 'react';
import { useToggle } from 'shared/hooks/useToggle';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { login, register } from 'shared/config/store/actionCreators/authActions';
import { selectAuthIsLoading, selectAuthError } from 'shared/config/store/selectors/authSelectors';
import cls from './AuthDialog.module.scss';

interface AuthDialogProps {
    isOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLElement;
}

export const AuthDialog = ({ isOpen, onClose, anchorEl }: AuthDialogProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isToggleUp: isLogin, toggle: toggleLogin } = useToggle(true);
    const dispatch = useAppDispatch();
    
    // Используем селекторы вместо локального состояния
    const isLoading = useAppSelector(selectAuthIsLoading);
    const error = useAppSelector(selectAuthError);
    
    const handleSubmitLogin = async () => {
        try {
            await dispatch(login({ email, password }));
            if (!error) {
                onClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmitRegister = async () => {
        try {
            await dispatch(register({ email, password }));
            if (!error) {
                onClose();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Dialog
            className={cls.authDialog}
            isOpen={isOpen}
            onClose={onClose}
            title={isLogin ? 'Вход' : 'Регистрация'}
            anchorEl={anchorEl}
        >
            {isLogin ? (
                <Form 
                    onSubmit={handleSubmitLogin} 
                    submitText={isLoading ? <div className={cls.loader} /> : 'Войти'}
                    disabled={isLoading}
                >
                    <Input
                        className={cls.input}
                        value={email}
                        onChange={setEmail}
                        placeholder="Email"
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        className={cls.input}
                        value={password}
                        onChange={setPassword}
                        placeholder="Пароль"
                        disabled={isLoading}
                    />
                </Form>
            ) : (
                <Form 
                    onSubmit={handleSubmitRegister} 
                    submitText={isLoading ? <div className={cls.loader} /> : 'Регистрация'}
                    disabled={isLoading}
                >
                    <Input
                        className={cls.input}
                        value={email}
                        onChange={setEmail}
                        placeholder="Email"
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        className={cls.input}
                        value={password}
                        onChange={setPassword}
                        placeholder="Пароль"
                        disabled={isLoading}
                    />
                </Form>
            )}
            <Button
                theme={ButtonTheme.IN_TEXT}
                onClick={toggleLogin}
                disabled={isLoading}
            >
                {isLogin ? 'Регистрация' : 'Вход'}
            </Button>
        </Dialog>
    );
};
