export default function DeckFooter({
  cardCount,
  sideBoard,
}: {
  cardCount: number;
  sideBoard: number;
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-700 to-purple-900 text-gray-100 py-2 px-4 flex justify-between items-center shadow-lg border-t border-purple-800">
      <span className="text-sm text-purple-200">
        <strong className="text-white">{cardCount}</strong> Main Deck /
        {sideBoard}
        Sideboard
      </span>
      <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded-md transition font-medium shadow-sm">
        Save Deck
      </button>
    </div>
  );
}
