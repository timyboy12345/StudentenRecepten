export default function Sidebar() {
    return (
        <div>
            <div className='font-serif text-xl'>Welkom bij StudentenRecepten</div>
            <div className='text-sm'>Dit is dé website om goedkope recepten te vinden. Kook je voor jezelf, of voor het hele huis? Geen probleem! Met de recepten die je hier vindt ben je altijd goed voorbereid, zonder je bankrekening te plunderen.</div>

            <div className='font-serif mt-4 text-lg mb-2'>Populaire Categorieën</div>
            <div className='grid grid-cols-2 gap-4'>
                {[1, 2, 3, 4, 5, 6].map((i) => <div className='w-full py-8 text-center bg-gray-200'>{i}</div>)}
            </div>
        </div>
    )
}
