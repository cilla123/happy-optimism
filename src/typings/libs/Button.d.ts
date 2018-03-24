/// <reference types="react" />

declare module 'happy-optimism/lib/button' {
    interface IButtonProps {
        type?: 'default' | 'primary' | 'danger' | 'success'
    }

    export default class Button extends React.Component<IButtonProps, any> {}
}