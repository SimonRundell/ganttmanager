<?php

function is_teacher_or_admin($user) {
    return in_array($user['role'], ['teacher', 'admin'], true);
}

function require_project_access($mysqli, $user, $projectId) {
    if (is_teacher_or_admin($user)) {
        return true;
    }

    $stmt = $mysqli->prepare('SELECT id FROM projects WHERE id = ? AND owner_id = ? LIMIT 1');
    $stmt->bind_param('ii', $projectId, $user['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->fetch_assoc()) {
        return true;
    }

    $member = $mysqli->prepare('SELECT id FROM project_members WHERE project_id = ? AND user_id = ? LIMIT 1');
    $member->bind_param('ii', $projectId, $user['id']);
    $member->execute();
    $memberResult = $member->get_result();
    if ($memberResult && $memberResult->fetch_assoc()) {
        return true;
    }

    send_response('Forbidden', 403);
}
