#!/usr/bin/python
class FilterModule(object):
    def filters(self):
        return {
            'mapelsurl': self.mapelsurl_filter,
            'mapelsips': self.mapelsips_filter
        }

    def mapelsurl_filter(self, elshostvars):
        for elsv in elshostvars:
           yield '"{0}://{1}:{2}"'.format(elsv['elasticsearch_protocol'], elsv['elasticsearch_hostip'], elsv['elasticsearch_port'])

    def mapelsips_filter(self, elshostvars):
        for elsv in elshostvars:
           yield '"{0}"'.format(elsv['elasticsearch_hostip'])
