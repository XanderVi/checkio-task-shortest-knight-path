"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
    "Basics": [
        {"input": "b1-d5", "answer": 2, "explanation": [[1, 2], [1, 2]]},
        {"input": "a6-b8", "answer": 1, "explanation": [[1, 2]]},
        {"input": "h1-g2", "answer": 4, "explanation": [[-2, 1], [-2, 1], [2, 1], [1, -2]]},
        {"input": "h8-d7", "answer": 3, "explanation": [[-1, -2], [-1, 2], [-2, -1]]},
        {"input": "a1-h8", "answer": 6, "explanation": [[1, 2], [-1, 2], [1, 2], [2, 1], [2, -1], [2, 1]]},
        {"input": "b1-e8", "answer": 4, "explanation": [[-1, 2], [1, 2], [1, 2], [2, 1]]},
        {"input": "e2-e3", "answer": 3, "explanation": [[-2, 1], [1, 2], [1, -2]]},
        {"input": "d5-b1", "answer": 2, "explanation": [[-1, -2], [-1, -2]]},
        {"input": "a4-h4", "answer": 5, "explanation": [[1, 2], [1, 2], [2, -1], [2, -1], [1, -2]]},
        {"input": "c3-d5", "answer": 1, "explanation": [[1, 2]]}
    ],
    "Extra": [
        {"input": "b2-d5", "answer": 3, "explanation": [[-1, 2], [1, 2], [2, -1]]},
        {"input": "a5-b8", "answer": 2, "explanation": [[2, 1], [-1, 2]]},

        {"input": "b2-a1", "answer": 4, "explanation": [[2, 1], [-1, 2], [-1, -2], [-1, -2]]},
        {"input": "g7-h8", "answer": 4, "explanation": [[-1, -2], [-1, 2], [2, -1], [1, 2]]},


        {"input": "h3-g2", "answer": 2, "explanation": [[-2, 1], [1, -2]]},
        {"input": "h4-d7", "answer": 3, "explanation": [[-1, 2], [-1, 2], [-2, -1]]},
        {"input": "a2-h8", "answer": 5, "explanation": [[1, 2], [1, 2], [1, 2], [2, -1], [2, 1]]},
        {"input": "b3-e8", "answer": 4, "explanation": [[-1, 2], [1, 2], [2, -1], [1, 2]]},
        {"input": "e1-e3", "answer": 2, "explanation": [[-2, 1], [2, 1]]},
        {"input": "d7-b1", "answer": 4, "explanation": [[2, -1], [-1, -2], [-1, -2], [-2, -1]]},
        {"input": "a2-h4", "answer": 5, "explanation": [[1, 2], [1, 2], [2, 1], [2, -1], [1, -2]]},
        {"input": "c2-d5", "answer": 2, "explanation": [[-1, 2], [2, 1]]}
    ]
}
assert checkio("b2-a1") == 4, "to lower-left corner"
assert checkio("g7-h8") == 4, "to upper-right corner"