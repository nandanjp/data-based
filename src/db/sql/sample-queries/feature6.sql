WITH ThreeMusketeers AS (
    SELECT u.email
    FROM Users u JOIN GroupMembers gm ON u.email = gm.email
    WHERE gm.gid = 999 AND u.email != 'your_own'
    LIMIT 3
),
RECURSIVE Circles AS (
    (SELECT 1 AS level, g.gid, g.groupName, g.ownedBy
    FROM Groups g
    WHERE g.gid = 999)
    UNION
    (
        SELECT c.level + 1, gm.gid, g.groupName, g.ownedBy
        FROM Circles c JOIN GroupMembers gm ON c.gid = gm.gid
        JOIN Groups g ON gm.gid = g.gid
        WHERE c.level < 3 AND gm.email IN (SELECT * FROM ThreeMusketeers)
    )
)

SELECT * FROM Circles
ORDER BY level, gid;