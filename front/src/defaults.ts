import {enqueueSnackbar} from "notistack";

interface InitialInput {
    value: string;
    status: '' | 'error';
}
export const initialInput:InitialInput = { value: '', status: ''}
