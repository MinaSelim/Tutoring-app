const preventPushToMaster = `branch=\`git symbolic-ref HEAD\`
if [ "$branch" = "refs/heads/master" ]; then
    echo "\\033[31mDirect push to master is not allowed.\\033[0m"
    exit 1
fi`;

module.exports = {
  hooks: {
    'pre-push': preventPushToMaster,
  },
};