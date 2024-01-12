document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resultElement = document.getElementById('result');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                return board[a];
            }
        }

        if (!board.includes('')) {
            gameActive = false;
            return 'T';
        }

        return null;
    };

    const handleCellClick = (index) => {
        if (gameActive && !board[index]) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            const winner = checkWinner();

            if (winner) {
                if (winner === 'T') {
                    resultElement.textContent = "It's a Tie!";
                } else {
                    resultElement.textContent = `${winner} wins!`;
                }
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    const handleResetButtonClick = () => {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        resultElement.textContent = '';
        cells.forEach((cell) => {
            cell.textContent = '';
        });
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', handleResetButtonClick);
});
