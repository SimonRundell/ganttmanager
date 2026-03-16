<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli, ['teacher', 'admin']);

$sql = 'SELECT u.id, u.email, u.screen_name, COUNT(p.id) AS project_count FROM users u LEFT JOIN projects p ON p.owner_id = u.id WHERE u.role = "student" GROUP BY u.id ORDER BY u.screen_name';
$result = $mysqli->query($sql);

$students = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row['status'] = ((int) $row['project_count'] > 0) ? 'Active' : 'Idle';
        $students[] = $row;
    }
}

send_response(['students' => $students]);
