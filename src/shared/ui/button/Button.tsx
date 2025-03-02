type Button = {
    btn_text: string
    btn_classes?: string
};

export const ButtonDefault = ({btn_text, btn_classes}: Button) => <button className={`btn__default ${btn_classes ? btn_classes : ""}`}>
{btn_text}
</button>