"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
var CHANGELOG_MD_HEADER = "\n<!--\nThis file is auto-generated using the monorepo-scripts package. Don't edit directly.\nEdit the package's CHANGELOG.json file only.\n-->\n\nCHANGELOG\n";
exports.changelogUtils = {
    getChangelogMdTitle: function (versionChangelog) {
        if (_.isUndefined(versionChangelog.timestamp)) {
            throw new Error('All CHANGELOG.json entries must be updated to include a timestamp before generating their MD version');
        }
        var date = moment("" + versionChangelog.timestamp, 'X').format('MMMM D, YYYY');
        var title = "\n## v" + versionChangelog.version + " - _" + date + "_\n\n";
        return title;
    },
    getChangelogMdChange: function (change) {
        var line = "    * " + change.note;
        if (!_.isUndefined(change.pr)) {
            line += " (#" + change.pr + ")";
        }
        return line;
    },
    generateChangelogMd: function (changelog) {
        var changelogMd = CHANGELOG_MD_HEADER;
        _.each(changelog, function (versionChangelog) {
            var title = exports.changelogUtils.getChangelogMdTitle(versionChangelog);
            changelogMd += title;
            var changelogVersionLines = _.map(versionChangelog.changes, exports.changelogUtils.getChangelogMdChange.bind(exports.changelogUtils));
            changelogMd += "" + _.join(changelogVersionLines, '\n');
        });
        return changelogMd;
    },
    shouldAddNewChangelogEntry: function (currentVersion, changelog) {
        if (_.isEmpty(changelog)) {
            return true;
        }
        var lastEntry = changelog[0];
        var isLastEntryCurrentVersion = lastEntry.version === currentVersion;
        return isLastEntryCurrentVersion;
    },
};
//# sourceMappingURL=changelog_utils.js.map