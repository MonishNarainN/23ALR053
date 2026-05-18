const priorityWeight = (priority) => {
  switch (priority) {
    case 'critical':
      return 100;
    case 'high':
      return 70;
    case 'medium':
      return 40;
    default:
      return 10;
  }
};

const prioritizeNotifications = (notifications) => {
  return [...notifications].sort((a, b) => {
    const scoreA = priorityWeight(a.priority) + new Date(a.createdAt).getTime() / 1e10;
    const scoreB = priorityWeight(b.priority) + new Date(b.createdAt).getTime() / 1e10;
    return scoreB - scoreA;
  });
};

module.exports = {
  prioritizeNotifications,
};
