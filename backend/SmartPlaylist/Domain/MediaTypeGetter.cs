﻿using System.Linq;
using MediaBrowser.Controller.Entities;
using MediaBrowser.Controller.Entities.Audio;
using MediaBrowser.Controller.Entities.TV;
using SmartPlaylist.Domain.CriteriaDefinition.CriteriaDefinitions;
using SmartPlaylist.Domain.Rule;
using SmartPlaylist.Extensions;

namespace SmartPlaylist.Domain
{
    public class MediaTypeGetter
    {
        public static string Get(RuleBase[] rules)
        {
            var mediaTypes = rules.OfType<RuleGroup>()
                .Flatten(x => x.Children.OfType<RuleGroup>())
                .SelectMany(x => x.Children)
                .OfType<Rule.Rule>()
                .Select(x => x.Criteria)
                .Where(x => x.CriteriaDefinition is MediaTypeCriteriaDefinition)
                .Select(x => x.Value.ToString())
                .Distinct()
                .ToArray();

            MediaTypeDescriptor descriptor = Const.SupportedItemTypes.FirstOrDefault(x => mediaTypes.Contains(x.Description));
            return descriptor != null ? descriptor.BaseType : MediaBrowser.Model.Entities.MediaType.Audio;
        }
    }
}