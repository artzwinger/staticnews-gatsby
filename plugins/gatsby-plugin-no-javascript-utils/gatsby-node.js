exports.onCreateWebpackConfig = (
  {
    stage,
    actions,
  },
  {
    noSourcemaps = true,
  },
) => {
  if (noSourcemaps && stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};

exports.onPreInit = () => console.log("Loaded no-javascript plugin")

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    noScript: Joi.boolean(),
    noSourcemaps: Joi.boolean(),
    removeGeneratorTag: Joi.boolean(),
    removeReactHelmetAttrs: Joi.boolean().warning('Deprecated'),
    removeHeadDataAttrs: Joi.boolean(),
    noInlineStyles: Joi.boolean(),
    removeGatsbyAnnouncer: Joi.boolean(),
  });
};
