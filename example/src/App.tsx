import * as React from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Linking,
  Image,
  Animated,
} from 'react-native';
import {
  Title,
  Button,
  Text,
  Provider as PaperProvider,
  Switch,
  DefaultTheme,
  DarkTheme,
  useTheme,
  overlay,
  Paragraph,
} from 'react-native-paper';
import {
  DatePickerModal,
  DatePickerModalContent,
  TimePickerModal,
} from '../../src';
import { addMonths } from '../../src/Date/dateUtils';

const baseDate = new Date();
const rangeExcludeDateStart = new Date(
  baseDate.getFullYear(),
  baseDate.getMonth(),
  baseDate.getDate()
);
const rangeExcludeDateEnd = addMonths(new Date(), 3);

function App({
  onToggleDarkMode,
  dark,
}: {
  onToggleDarkMode: () => any;
  dark: boolean;
}) {
  const theme = useTheme();
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({ startDate: undefined, endDate: undefined });
  const [excludedDates, setExcludedDates] = React.useState<Date[]>([]);
  const [time, setTime] = React.useState<{
    hours: number | undefined;
    minutes: number | undefined;
  }>({ hours: undefined, minutes: undefined });
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [rangeOpen, setRangeOpen] = React.useState(false);
  const [rangeExcludeOpen, setRangeExcludeOpen] = React.useState(false);

  const [singleOpen, setSingleOpen] = React.useState(false);

  const onDismissTime = React.useCallback(() => {
    setTimeOpen(false);
  }, [setTimeOpen]);

  const onDismissRange = React.useCallback(() => {
    setRangeOpen(false);
  }, [setRangeOpen]);

  const onDismissExcludeRange = React.useCallback(() => {
    setRangeExcludeOpen(false);
  }, [setRangeExcludeOpen]);

  const onDismissSingle = React.useCallback(() => {
    setSingleOpen(false);
  }, [setSingleOpen]);

  const onChangeRange = React.useCallback(
    ({ startDate, endDate }) => {
      setRangeOpen(false);
      setRange({ startDate, endDate });
    },
    [setRangeOpen, setRange]
  );

  const onChangeExcludeRange = React.useCallback(
    ({ excludedDates }: { excludedDates: Date[] }) => {
      setRangeExcludeOpen(false);
      setExcludedDates(excludedDates);
    },
    [setRangeExcludeOpen, setExcludedDates]
  );

  const onChangeSingle = React.useCallback(
    (params) => {
      setSingleOpen(false);
      setDate(params.date);
    },
    [setSingleOpen, setDate]
  );

  const onConfirmTime = React.useCallback(
    ({ hours, minutes }) => {
      setTimeOpen(false);
      setTime({ hours, minutes });
    },
    [setTimeOpen, setTime]
  );

  // generate date from time
  let timeDate = new Date();
  time.hours !== undefined && timeDate.setHours(time.hours);
  time.minutes !== undefined && timeDate.setMinutes(time.minutes);

  const backgroundColor =
    theme.dark && theme.mode === 'adaptive'
      ? overlay(3, theme.colors.surface)
      : (theme.colors.surface as any);

  return (
    <>
      <ScrollView
        style={[
          styles.root,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Image source={require('./schedule.png')} style={styles.logo} />
            <Title>react-native-paper-dates</Title>
          </View>

          <Paragraph>
            Smooth and fast cross platform Material Design date picker for React
            Native Paper brought to you by{' '}
            <Text
              onPress={() => Linking.openURL('https://webridge.nl')}
              style={styles.underline}
            >
              webRidge
            </Text>
          </Paragraph>
        </View>
        <View style={styles.content}>
          <Button
            uppercase={false}
            mode="contained"
            icon="github"
            style={styles.twitterButton}
            onPress={() =>
              Linking.openURL(
                'https://github.com/web-ridge/react-native-paper-dates'
              )
            }
          >
            GitHub
          </Button>
          <TwitterFollowButton userName={'RichardLindhout'} />
          <TwitterFollowButton userName={'web_ridge'} />
        </View>
        <Animated.View
          style={[
            styles.content,
            styles.contentShadow,
            {
              backgroundColor,
            },
          ]}
        >
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { ...theme.fonts.medium }]}>
              Dark mode
            </Text>
            <View style={styles.switchSpace} />
            <Switch value={dark} onValueChange={onToggleDarkMode} />
          </View>
          <Enter />
          <Enter />
          <Enter />
          <Enter />
          <View>
            <Row>
              <Label>Date</Label>
              <Text>{date ? dateFormatter.format(date) : '-'}</Text>
            </Row>
            <Row>
              <Label>Range</Label>
              <Text>
                {[
                  range.startDate ? dateFormatter.format(range.startDate) : '',
                  range.endDate ? dateFormatter.format(range.endDate) : '',
                ].join(' - ')}
              </Text>
            </Row>
            <Row>
              <Label>Time</Label>
              <Text>
                {time && time.hours !== undefined && time.minutes !== undefined
                  ? timeFormatter.format(timeDate)
                  : '-'}
              </Text>
            </Row>
          </View>
          <Enter />
          <Enter />
          <View style={styles.buttons}>
            <Button
              onPress={() => setSingleOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick single date
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setRangeOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick range
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setRangeExcludeOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Exclude dates in range
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              onPress={() => setTimeOpen(true)}
              uppercase={false}
              mode="outlined"
              style={styles.pickButton}
            >
              Pick time
            </Button>
          </View>
          <Enter />
        </Animated.View>
        <View style={styles.content}>
          <Title>Inside page</Title>
        </View>
        <Animated.View
          style={[
            styles.content,
            styles.contentShadow,
            styles.contentInline,
            { backgroundColor },
          ]}
        >
          <DatePickerModalContent
            // locale={'en'} optional, default: automatic
            mode="range"
            onDismiss={onDismissRange}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onChangeRange}
          />
        </Animated.View>
        <Enter />
        <Enter />
        <Enter />
      </ScrollView>
      <DatePickerModal
        // locale={'en'} optional, default: automatic
        mode="range"
        visible={rangeOpen}
        onDismiss={onDismissRange}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onChangeRange}
        // locale={'nl'} // optional
        // saveLabel="Save" // optional
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
      />
      <DatePickerModal
        // locale={'en'} optional, default: automatic
        mode="excludeInRange"
        visible={rangeExcludeOpen}
        onDismiss={onDismissExcludeRange}
        startDate={rangeExcludeDateStart}
        endDate={rangeExcludeDateEnd}
        excludedDates={excludedDates}
        onConfirm={onChangeExcludeRange}
        // sunday, saturday
        disableWeekDays={disabledWeekDays}
        // emptyLabel="Altijd"
        // label="Ik kan niet op"
        // animationType="slide" // optional, default is slide on ios/android and none on web
      />
      <DatePickerModal
        // locale={'en'} optional, default: automatic
        mode="single"
        visible={singleOpen}
        onDismiss={onDismissSingle}
        date={undefined}
        onConfirm={onChangeSingle}
        // saveLabel="Save" // optional
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />

      <TimePickerModal
        // locale={'en'} optional, default: automatic
        visible={timeOpen}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}
        hours={time.hours} // optional, default: current hours
        minutes={time.minutes} // optional, default: current minutes
        // label="Select time" // optional, default 'Select time'
        // cancelLabel="Cancel" // optional, default: 'Cancel'
        // confirmLabel="Ok" // optional, default: 'Ok'
        // animationType="fade" // optional, default is 'none'
      />
    </>
  );
}

const disabledWeekDays = [0, 6];

function Enter() {
  return <View style={styles.enter} />;
}

function Row({ children }: { children: any }) {
  return <View style={styles.row}>{children}</View>;
}

function Label({ children }: { children: string }) {
  const theme = useTheme();
  return (
    <Text style={[styles.label, { ...theme.fonts.medium }]}>{children}</Text>
  );
}

export default function AppWithProviders() {
  const [dark, setDark] = React.useState(false);
  const onToggleDarkMode = () => {
    setDark((prev) => !prev);
  };

  return (
    <PaperProvider
      theme={
        dark
          ? {
              ...DarkTheme,
              roundness: 10,
              colors: {
                ...DarkTheme.colors,
                // primary: '#F59E00',
                // accent: '#FBBE5E',
              },
            }
          : {
              ...DefaultTheme,
              roundness: 10,
              colors: {
                ...DefaultTheme.colors,
                // primary: '#F59E00',
                // accent: '#FBBE5E',
              },
            }
      }
    >
      <React.Fragment>
        {Platform.OS === 'web' ? (
          <style type="text/css">{`
          @font-face {
            font-family: 'MaterialCommunityIcons';
            src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
          }
        `}</style>
        ) : null}
        <App onToggleDarkMode={onToggleDarkMode} dark={dark} />
      </React.Fragment>
    </PaperProvider>
  );
}

function TwitterFollowButton({ userName }: { userName: string }) {
  return (
    <Button
      uppercase={false}
      mode="outlined"
      icon="twitter"
      style={styles.twitterButton}
      onPress={() => Linking.openURL(`https://twitter.com/${userName}`)}
    >
      @{userName}
    </Button>
  );
}

const styles = StyleSheet.create({
  underline: { textDecorationLine: 'underline' },
  logo: { width: 56, height: 56, marginRight: 24 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  twitterButton: { marginBottom: 16 },
  root: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 500,
    marginTop: 24,
    padding: 24,
    alignSelf: 'center',
    flex: 1,
  },
  contentInline: {
    padding: 0,
    height: 600,
  },
  contentShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  switchSpace: { flex: 1 },
  switchLabel: { fontSize: 16 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24 },
  pickButton: { marginTop: 6 },
  buttonSeparator: { width: 6 },
  enter: { height: 12 },
  label: { width: 100, fontSize: 16 },
  row: { paddingTop: 12, paddingBottom: 12, flexDirection: 'row' },
});
