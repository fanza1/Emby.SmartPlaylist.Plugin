using System;
using SmartPlaylist.Contracts;
using SmartPlaylist.Extensions;
using System.Linq;

namespace SmartPlaylist.Domain
{
    public class SortJob
    {
        public bool Enabled { get; set; }
        public UpdateType UpdateType { get; set; }
        public IOrder OrderBy { get; set; }
        public int SyncCount { get; set; }
        public long LastSyncDuration { get; set; } = 0;
        public string Status { get; set; }
        public DateTimeOffset? NextUpdate { get; set; } = null;
        public DateTime? LastUpdated { get; set; } = null;
        public DateTime? LastRan { get; set; } = null;

        public SortJob() { }

        public SortJob(SortJobDto dto)
        {
            Enabled = dto.Enabled;
            UpdateType = UpdateType.ConvertFromString<UpdateType>(dto.UpdateType, UpdateType.Live);
            OrderBy = IOrder.GetOrderFromString(dto.OrderBy);
            SyncCount = dto.SyncCount;
            LastSyncDuration = dto.LastSyncDuration;
            Status = dto.Status;
            NextUpdate = dto.NextUpdate;
            LastUpdated = dto.LastUpdated;
            LastRan = dto.LastRan;
        }

        public SortJobDto ToDto()
        {
            return new SortJobDto()
            {
                Enabled = Enabled,
                UpdateType = UpdateType.ToString(),
                OrderBy = OrderBy.Name,
                SyncCount = SyncCount,
                LastSyncDuration = LastSyncDuration,
                Status = Status,
                NextUpdate = NextUpdate,
                LastUpdated = LastUpdated,
                LastRan = LastRan
            };
        }

        public void UpdateNextUpdate()
        {
            var now = DateTime.UtcNow.Date;

            switch (UpdateType)
            {
                case UpdateType.Daily:
                    NextUpdate = now.AddDays(1);
                    break;
                case UpdateType.Weekly:
                    NextUpdate = now.AddDays(7);
                    break;
                case UpdateType.Monthly:
                    NextUpdate = now.AddMonths(1);
                    break;
            }
        }

        public bool AvailableToSort()
        {
            return Enabled && (DateTimeOffset.UtcNow > NextUpdate.Value);
        }
    }
}