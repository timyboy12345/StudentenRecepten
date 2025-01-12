export function alterIngredientAmount(unit: string, amount: number) {
    if (unit === 'empty') {
        return amount;
    }

    return `${amount} ${unit}`;
}
