export function alterIngredientAmount(unit: string, amount: number) {
    if (unit === 'empty') {
        switch (amount) {
            case 0.75:
                return '3/4';
            case 0.5:
                return '1/2';
            case 0.25:
                return '1/4';
            default:
                return amount;
        }
    }

    return `${amount} ${unit}`;
}
