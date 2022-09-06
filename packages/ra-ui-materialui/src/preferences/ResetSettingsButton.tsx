import * as React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslate, useRemoveFromStore } from 'ra-core';
import { Confirm } from '../layout';

/**
 * Resets the settings for a given preferences key
 *
 * @example
 *
 * <ResetSettingsButton preferencesKey="myPreferencesKey" />
 */
export const ResetSettingsButton = ({
    preferencesKeys,
    onReset,
}: ResetSettingsButtonProps) => {
    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    const remove = useRemoveFromStore();

    const handleClick = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        preferencesKeys.map(remove);
        onReset && onReset();
        setOpen(false);
    };

    return (
        <Root>
            <Button
                fullWidth
                size="small"
                onClick={handleClick}
                className={ResetSettingsButtonClasses.button}
            >
                {translate('ra.inspector.reset', {
                    _: 'Reset Settings',
                })}
            </Button>
            <Confirm
                isOpen={open}
                loading={false}
                title="ra.message.are_you_sure"
                content=""
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </Root>
    );
};

const PREFIX = 'RaResetSettingsButton';

export const ResetSettingsButtonClasses = {
    button: `${PREFIX}-button`,
};

const Root = styled('span', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${ResetSettingsButtonClasses.button}`]: {
        marginTop: theme.spacing(1),
    },
}));

export interface ResetSettingsButtonProps {
    preferencesKeys: string[];
    onReset?: () => void;
}