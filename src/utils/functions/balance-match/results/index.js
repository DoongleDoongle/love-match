export const getResultChoices = (
  togetherChoiceIds = [],
  compareChoices = [],
  myChoiceIds = []
) => {
  // compareChoices -> allChoices, togetherChoiceIds -> allParticipants.togetherLikesChoiceIds

  const selectedChoicesGrouping = compareChoices.reduce(
    (acc, selectedChoice) => {
      const foundChoices = compareChoices.filter(
        (choice) => choice.groupId === selectedChoice.groupId
      );

      const sortedChoices = foundChoices.sort((a, b) => a.id - b.id);
      const updatedChoices = sortedChoices.map((choice) => {
        return {
          ...choice,
          isSelectedTogether: togetherChoiceIds.includes(choice.id),
          isSelectedMe: myChoiceIds.includes(choice.id),
        };
      });
      return [...acc, updatedChoices];
    },
    []
  );

  const seenGroupIds = new Set();
  return selectedChoicesGrouping.filter((subArray) => {
    const groupId = subArray[0].groupId;
    if (seenGroupIds.has(groupId)) {
      return false;
    } else {
      seenGroupIds.add(groupId);
      return true;
    }
  });
};
